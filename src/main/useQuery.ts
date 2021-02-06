import { useLocation } from "react-router-dom";
import { Invite, parse } from "./invite";

export function useRawInvite() {
  const query = new URLSearchParams(useLocation().search);
  return query.get("i") as string | null;
}

export default function useInvite(): Invite {
  return parse(useRawInvite());
}
