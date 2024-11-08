export const handleUnsubscribe = (
    groupId: number,
    subscribedGroups: number[],
    setSubscribedGroups: React.Dispatch<React.SetStateAction<number[]>>,
    onUnsubscribe: (groupId: number) => void
  ) => {
    setSubscribedGroups((prev) => prev.filter((id) => id !== groupId));
    onUnsubscribe(groupId);
  };