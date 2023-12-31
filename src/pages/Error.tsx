import paths from '@/app/lib/router/paths';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Error(): JSX.Element {
  const nav = useNavigate();
  
  useEffect(() => nav(paths.home), [])

  return (
    <>
      <span>ERROR</span>
    </>
  );
}

export default Error;