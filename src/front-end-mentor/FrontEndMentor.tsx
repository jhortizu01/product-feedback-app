import '../index.scss';

interface IProps {
  hamburger: string;
  mobileToggleHamburger(): void;
}

export const FrontEndMentor = (props: IProps) => {
  const { hamburger, mobileToggleHamburger } = props;

  return (
    <div className="front-end-mentor-header">
      <div className="front-end-mentor-header__text">
        <div>
          <h1>Front End Mentor</h1>
          <h2>Feedback Board</h2>
        </div>
        <button
          className={`mobile-hamburger ${hamburger}`}
          onClick={mobileToggleHamburger}
        ></button>
      </div>
    </div>
  );
};
