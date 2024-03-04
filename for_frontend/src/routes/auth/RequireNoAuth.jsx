import { Outlet, redirect } from "react-router-dom";
import { network } from "../..";
import { Header } from '../../components/_index';

export async function loader() {
  const myAuthority = sessionStorage.getItem('AUTHORITY');
  const indexEndpoint = '/';

  if (!myAuthority) {
    return null;
  } else {
    // ログインしている場合はサーバーにログイン状態を確認
    try {
      const res = await fetch(network + '/check_logging', {
        method: 'GET',
        headers: {
          'Authorization': myAuthority
        }
      });
      if (res.ok) {
        return redirect(indexEndpoint); // 追加: ログイン中は/indexにリダイレクト
      } else {
        // ログイン状態が確認できなかった場合はエラーを処理
        sessionStorage.removeItem('AUTHORITY');
        throw new Error('Failed to check login status.');
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

const RequireNoAuth = () => {
    return (
      <>
        <Header />
        <Outlet />
      </>
    )
}

export default RequireNoAuth;
