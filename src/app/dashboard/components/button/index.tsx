"use client";

import { useRouter } from "next/navigation";
import { FiRefreshCcw } from "react-icons/fi";

export function ButtonRefrash() {
  const router = useRouter();
  return (
    <button onClick={() => router.refresh()}>
      <FiRefreshCcw size={24} color="black" />
    </button>
  );
}
