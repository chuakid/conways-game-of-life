import { PropsWithChildren } from "react";

function ControlGroup({ children }: PropsWithChildren) {
  return (
    <div className="flex gap-5 bg-slate-800 p-5 rounded-2xl">
      {children}</div>
  );
}

export default ControlGroup;