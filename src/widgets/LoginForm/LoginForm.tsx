import { useState, useEffect } from 'react';
import useFetchMethod from '@/shared/lib/hooks/useFetchMothod';
import changeInput from '@/shared/lib/helpers/changeInput';
import { httpMethods } from '@/shared/lib/constants/httpMethod';
import { getToken, setToken } from '@/shared/lib/helpers/token';
import { Link, useNavigate } from 'react-router-dom';
import paths from '@/app/Router/paths';
import useHash from '@/shared/lib/hooks/useHash';

function LoginForm(): JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const nav = useNavigate();
  const { hash, sethash } = useHash();
  const { isLoading, data, callFetch } = useFetchMethod<{ token: string }>(
    'http://localhost:5555/api/v1/auth/login',
    httpMethods.POST,
    { email, password: hash },
    false
  );

  useEffect(() => {
    if (data != null) {
      setToken(data.token);
      nav(paths.home);
    }
  }, [data]);

  useEffect(() => sethash(password), [password]);

  useEffect(() => {
    const token = getToken();
    if (token != null && token != '') {
      nav(paths.home);
    }
  }, []);

  function login(): void {
    callFetch();
  }

  return (
    <div style={{ display: 'flex', gap: '15px', flexDirection: 'column' }}>
      <input
        type='email'
        placeholder='email'
        value={email}
        onChange={changeInput(setEmail)}
      />
      <input
        type='password'
        placeholder='password'
        value={password}
        onChange={changeInput(setPassword)}
      />
      <div>
        <button onClick={login}>Log in</button>
      </div>
      <div>
        Don't have an account? <Link to={paths.signup}>Create a new account</Link>
      </div>
    </div>
  );
}

export default LoginForm;
