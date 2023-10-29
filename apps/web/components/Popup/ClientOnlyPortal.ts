import { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function ClientOnlyPortal({ children, selector }:{children: any, selector: any}) {
  const ref = useRef();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector(selector);
    setMounted(true);
  }, [selector]);
  // @ts-ignore
  return mounted ? createPortal(children, ref.current) : null;
}