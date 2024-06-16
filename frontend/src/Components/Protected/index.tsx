const Protected = (props: any) => {
  const { children } = props;
  console.log("Protected");

  return children;
};

export default Protected;
