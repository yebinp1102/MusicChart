import { useEffect, useState } from "react";

// search를 위해 input의 onChange 이벤트가 발생할 때마다 함수를 호출하지 않고,
// 이벤트 발생 직후 일정 시간(delay만큼) 동안 발생하는 입력 이벤트는 무시함
export default function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    
    // delay 만큼 시간이 흐르고 기존 debounceValue(=검색값) 업데이트
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
  
    // timeout 되거나 useDebounce component가 종료되면 debounce의 값을 반환
    // delay이전에 value를 업데이트하는 경우 timeout이 취소됨(갱신됨)
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  
  
  return debouncedValue;
}