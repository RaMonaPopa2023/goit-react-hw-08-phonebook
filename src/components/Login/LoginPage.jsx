import React, { useState } from 'react';
import authService from '../common/service/authService';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logoutUser } from '../../redux/slices/authSlice';
import { selectUser } from '../../redux/slices/selector';
import Error from '../common/Error/Error';
import { Input, Button } from '@chakra-ui/react';

function LoginPage() {
  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
  const userInfo = useSelector(selectUser);

  const dispatch = useDispatch();

  const handleLoginSubmit = async e => {
    e.preventDefault();

    try {
      const payload = {
        email: emailLogin,
        password: passwordLogin,
      };

      await dispatch(loginUser(payload));
    } catch (err) {
      console.error('Failed to login the user ', err);
    }
  };

  const handleLogout = async e => {
    e.preventDefault();
    await dispatch(logoutUser());
    authService.logout();
  };

  const errorMessage = userInfo?.error || '';

  return (
    <section>
      <code>{JSON.stringify(userInfo)}</code>
      {errorMessage.length > 0 && <Error message={errorMessage}></Error>}
      <form onSubmit={handleLoginSubmit}>
        <label>
          <span>Email</span>
          <Input type="text" onChange={e => setEmailLogin(e.target.value)} />
        </label>
        <label>
          <span>Password</span>
          <Input
            type="password"
            onChange={e => setPasswordLogin(e.target.value)}
          />
        </label>
        <Button type="submit" colorScheme="blue">
          Login
        </Button>
      </form>

      <Button colorScheme="blue" onClick={handleLogout}>
        Logout
      </Button>
    </section>
  );
}

export default LoginPage;

// import React, { useState } from 'react';
// import authService from '../common/service/authService';
// import { useDispatch, useSelector } from 'react-redux';
// import { loginUser, logoutUser } from '../../redux/slices/authSlice';
// import { selectUser } from '../../redux/slices/selector';
// import Error from '../common/Error/Error';

// import { Input, Button } from '@chakra-ui/react';

// function LoginPage() {
//   const [emailLogin, setEmailLogin] = useState('');
//   const [passwordLogin, setPasswordLogin] = useState('');
//   const userInfo = useSelector(selectUser);

//   const dispatch = useDispatch();

//   const handleLoginSubmit = async e => {
//     e.preventDefault();

//     try {
//       const payload = {
//         email: emailLogin,
//         password: passwordLogin,
//       };

//       await dispatch(loginUser(payload));
//     } catch (err) {
//       console.error('Failed to login the user ', err);
//     }
//   };

// const handleLogout = async e => {
//   e.preventDefault();
//   await dispatch(logoutUser());
//   authService.logout();
// };

//   const errorMessage = userInfo?.error || '';

//   return (
//     <section>
//       <code>{JSON.stringify(userInfo)}</code>
//       {errorMessage.length > 0 && <Error message={errorMessage}></Error>}
//       <form onSubmit={handleLoginSubmit}>
//         <h2>Login</h2>
//         <label>
//           <span>Email</span>
//           <Input
//             htmlSize={4}
//             width="auto"
//             type="text"
//             onChange={e => setEmailLogin(e.target.value)}
//           />
//         </label>
//         <label>
//           <span>Password</span>
//           <Input
//             htmlSize={4}
//             width="auto"
//             type="password"
//             onChange={e => setPasswordLogin(e.target.value)}
//           />
//         </label>

//         <Button colorScheme="blue">Login</Button>
//       </form>

//       <Button colorScheme="blue" onClick={handleLogout}>
//         Logout
//       </Button>
//     </section>
//   );
// }

// export default LoginPage;
