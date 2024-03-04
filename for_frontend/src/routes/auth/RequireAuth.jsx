import { Outlet, redirect } from "react-router-dom";
import { network } from "../..";
import { Header } from '../../components/_index';

export async function loader() {
  const myAuthority = sessionStorage.getItem('AUTHORITY');
  const homeEndpoint = '/home';

  if (!myAuthority) {
    // ログインしていない場合はログインページにリダイレクト
    return redirect(homeEndpoint);
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
        const data = await res.json();
        console.log(`"${data?.user}" logged in.`);
        return (data);
      } else {
        // ログイン状態が確認できなかった場合はエラーを処理
        sessionStorage.removeItem('AUTHORITY');
        throw new Error('Failed to check login status.');
      }
    } catch (error) {
      console.log(error);
      return redirect(homeEndpoint);
    }
  }
}

const RequireAuth = () => {
    return (
      <>
        <Header />
        <Outlet />
      </>
    )
}

export default RequireAuth;