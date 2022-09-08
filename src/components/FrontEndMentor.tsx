import '../index.scss';

interface IProps {
  hamburger: string;
  mobileToggleHamburger(): void;
}

export const FrontEndMentorHeader = (props: IProps) => {
  const { hamburger, mobileToggleHamburger } = props;

  return (
    <div className="front-end-mentor-header">
      <div className="front-end-mentor-header__text">
        <div>
          <span>Front End Mentor</span>
          <span>Feedback Board</span>
        </div>
        <button
          className={`mobile-hamburger ${hamburger}`}
          onClick={mobileToggleHamburger}
        ></button>
      </div>
    </div>
  );
};
