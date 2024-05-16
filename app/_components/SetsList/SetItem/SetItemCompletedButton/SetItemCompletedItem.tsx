interface SetItemCompletedButton {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

function SetItemCompletedButton({ children, onClick }: SetItemCompletedButton) {
  return <button onClick={onClick}>{children}</button>;
}

export default SetItemCompletedButton;
