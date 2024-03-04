import { network } from '../../index';
import { redirect } from 'react-router-dom';

export async function authAction(request, url, red) {
  try {
    const formData = Object.fromEntries(await request.formData());
    const response = await fetch(network + url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
      mode: 'cors'
    });

    const result = await response.json();

    if (response.ok) {
      //サインアップ成功
      if (result && result.token)
      setAuthToken(result.token)
      return redirect(`${red}`);
    } else {
      console.error('Error:', response.status);
    }

    return result;

  } catch (error) {
    console.error('Error:', error);
    return { error: 'Server not found.' };
  }
}

const setAuthToken = (token) => {
  sessionStorage.setItem('AUTHORITY', token);
}

export function requireAuth(callback) {
  const myAuthority = sessionStorage.getItem('AUTHORITY');
  const loginEndpoint = '/login';

  if (!myAuthority) {
    console.log("null")
    // ログインしていない場合はログインページにリダイレクト
    return loginEndpoint;
  } else {
    console.log("fetch!!")
    // ログインしている場合はサーバーにログイン状態を確認
    fetch(network + '/check_logging', {
      method: 'GET',
      headers: {
        'Authorization': myAuthority // 認証トークンをAuthorizationヘッダーに設定
      }
    })
    .then(response => {
      if (response.ok) {
        // ログイン状態が確認された場合は渡された関数を実行
        console.log("OK!!")
        if (callback && typeof callback === 'function') {
          callback();
        }
        return null;
      } else {
        // ログイン状態が確認できなかった場合はエラーを処理
        throw new Error('Failed to check login status.');
      }
    })
    .then(data => {
      // ログイン状態の情報を取得した場合の処理
      console.log(data);
    })
    .catch(error => {
      // エラーが発生した場合の処理
      console.error(error);
      // エラーが発生した場合はログインページにリダイレクト
      return loginEndpoint;
    });
  }
}

