import MDXViewer from "../components/MDXViewer";

// import LessonFooter from "./LessonFooter";

const Lesson = ({data}) => {
  return (
    <div className="relative">

      <div className="z-50">
        {/* <Progress num={4} active={1} from={"lesson"} /> */}
      </div>

      <div className="prose text-container relative bg-white z-0">
        <div className="h-24 w-1"></div>
        <MDXViewer data={data} />
        {/* <LessonFooter /> */}
      </div>
    </div>
  );
};

export default Lesson;
