import "./Heading.css"

const Heading = () => {
  return (
    <div className="taskiumHeadingContainer inlineBlock">
      <img
        src="https://ohegciuzbnobpqonduik.supabase.co/storage/v1/object/sign/images/taskium_logo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzRlZDYzMzQwLTE5NGUtNGEwNC05YzMwLTQxZTY0Y2M3NjNjYiJ9.eyJ1cmwiOiJpbWFnZXMvdGFza2l1bV9sb2dvLnBuZyIsImlhdCI6MTc0Njg5MzYwOSwiZXhwIjozMTU1MzE1MzU3NjA5fQ.75ccgDct_Q9Rm933LALumB4LtzvGpBkJ3M7xo28FYAg"
        alt="taskium logo..."
        className="taskiumImg inlineBlock"
      />
      <h1 className="taskiumTitle inlineBlock">Taskium</h1>
    </div>
  );
};

export default Heading;
