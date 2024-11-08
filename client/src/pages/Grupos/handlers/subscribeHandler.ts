export const handleSubscribe = (
    groupId: number,
    subscribedGroups: number[],
    setSubscribedGroups: React.Dispatch<React.SetStateAction<number[]>>,
    onSubscribe: (groupId: number) => void
  ) => {
    setSubscribedGroups((prev) => [...prev, groupId]);
    onSubscribe(groupId);
  };