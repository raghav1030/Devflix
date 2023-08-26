import logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import TimelineImage from "../../../assets/Images/TimelineImage.png";

const timeline = [
  {
    Logo: logo1,
    Heading: "Leadership",
    Description: "Fully committed to the success of the company",
  },
  {
    Logo: logo2,
    Heading: "Leadership",
    Description: "Fully committed to the success of the company",
  },
  {
    Logo: logo3,
    Heading: "Leadership",
    Description: "Fully committed to the success of the company",
  },
  {
    Logo: logo4,
    Heading: "Leadership",
    Description: "Fully committed to the success of the company",
  },
];

const TimelineSection = () => {
  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-20 mb-20 items-center ">
        <div className="lg:w-[45%] flex flex-col gap-14 lg:gap-3   ">
          {timeline.map((element, index) => {
            return (
              <div className="flex flex-col lg:gap-3 " key={index}>
                <div className="flex justify-center items-center gap-6">
                  <div className=" w-[52px] h-[52px] bg-white rounded-full flex justify-center items-center shadow-[#00000047] shadow-[0_0_62px_0]       ">
                    <img height="19px" width="19px" src={element.Logo} alt="" />
                  </div>

                  <div>
                    <h2 className=" font-semibold text-[18px]">
                      {element.Heading}
                    </h2>
                    <p className="text-base ">
                      {element.Description}
                    </p>
                  </div>
                </div>

                {index !== timeline.length - 1 ? (
                  <div className="lg:block hidden h-14 border-dotted border-r border-richblack-100 ml-[36px]  w-[26px]">
                    {" "}
                  </div>
                ) : (
                  ""
                )}
              </div>
            );
          })}
        </div>

        <div className="relative w-fit h-fit shadow-blue-200 shadow-[0px_0px_30px_0px]">
          <div className="absolute lg:left-[50%] lg:bottom-0 lg:translate-x-[-50%] lg:translate-y-[50%] bg-caribbeangreen-700 flex lg:flex-row flex-col text-white uppercase py-5 gap-4 lg:gap-0 lg:py-10 ">
            {/* Section 1 */}
            <div className="flex gap-5 items-center lg:border-r border-caribbeangreen-300 px-7 lg:px-14">
              <h1 className="text-3xl font-bold w-[75px]">10</h1>
              <h1 className="text-caribbeangreen-300 text-sm w-[75px]">
                Years experiences
              </h1>
            </div>

            {/* Section 2 */}
            <div className="flex gap-5 items-center lg:px-14 px-7">
              <h1 className="text-3xl font-bold w-[75px]">250</h1>
              <h1 className="text-caribbeangreen-300 text-sm w-[75px]">
                types of courses
              </h1>
            </div>
            <div></div>
          </div>
          <img
            src={TimelineImage}
            alt="timelineImage"
            className="shadow-white shadow-[20px_20px_0px_0px] object-cover h-[400px] lg:h-fit"
          />
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;
