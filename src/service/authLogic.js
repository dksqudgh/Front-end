import { getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup
 } from 'firebase/auth'
class AuthLogic{
  //아래 생성자 함수는 AuthLogic 생성될 때 호출된다.
  //생성될 때 -> const authLogic = new AuthLogic()
  constructor(){//생성자 함수 - 전변 초기화 - 경유해야 null이 아니라 값이 들어있다.
    this.auth = getAuth()
    //this.gitProvider = new GithubAuthProvider()
    this.googleProvider = new GoogleAuthProvider()
  }
  getUserAuth = () => {
    return this.auth
  }
  getGoogleAuthProvider = () => {
    return this.googleProvider
  }
}
export default AuthLogic

export const onAuthChange = (auth) => {
  console.log('onAuthChange호출');
  return new Promise((resolve)=> {
    auth.onAuthStateChanged(user => {
    console.log(user);
  //Promise에서는 요청이 성공하면 resolve함수를 호출해줌
  //요청한 곳으로 반환해줄 값이 존재하면 파라미터 자리에 넣어줌.  
    resolve(user)
  });
  })

}//end of onAuthChange

export const logout = async(auth) => {
  try {
    await auth.signOut()
    window.localStorage.clear();
  } catch (error) {
    console.error("로그아웃 실패!!!", error);
  }
}//end of logout

export const loginGoogle = async(auth, googleProvider) => {
  console.log('loginGoogle 호출');
  try {
    const res = await signInWithPopup(auth, googleProvider)
    const user = res.user 
    return user
  } catch (error) {
    console.error("로그인 실패!!!",error);
    throw error
  }
}//end of loginGoogle