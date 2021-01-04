import Player from "./Player";

export interface Invite {
  roomId: string;
  playerId: Player;
}

export function parse(invite: string): Invite {
  const [roomId, playerId] = atob(invite).split(":");

  return {
    roomId,
    playerId: playerId as Player,
  };
}

export function stringify(invite: Invite) {
  return btoa(`${invite.roomId}:${invite.playerId}`);
}
