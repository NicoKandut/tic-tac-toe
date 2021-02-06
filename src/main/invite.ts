import Player from "./Player";

export interface Invite {
  roomId: string | undefined;
  playerId: Player;
}

export function parse(invite: string | null): Invite {
  const [roomId, playerId] = atob(decodeURI(invite || "")).split(":");

  return {
    roomId,
    playerId: playerId as Player,
  };
}

export function stringify(invite: Invite) {
  return encodeURI(btoa(`${invite.roomId}:${invite.playerId}`));
}
