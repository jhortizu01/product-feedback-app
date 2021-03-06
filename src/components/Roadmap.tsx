import classNames from 'classnames';
import { data } from 'data';

//styles
import '../index.scss';

//types
import { Status, STATUSES } from 'types';

export const Roadmap = () => {
  let plannedCount = data.productRequests.filter((item) => {
    return item.status === 'planned';
  }).length;

  let inProgressCount = data.productRequests.filter((item) => {
    return item.status === 'in-progress';
  }).length;

  let liveCount = data.productRequests.filter((item) => {
    return item.status === 'in-progress';
  }).length;

  let statuses: Status[] = [
    { status: STATUSES.PLANNED, count: plannedCount },
    { status: STATUSES.IN_PROGRESS, count: inProgressCount },
    { status: STATUSES.LIVE, count: liveCount },
  ];

  return (
    <section className="roadmap">
      <div className="roadmap__text">
        <span>Roadmap</span>
        <span>View</span>
      </div>
      <div className="roadmap__list">
        {statuses.map((status: Status) => {
          const dotClass = classNames({
            planned: status.status === STATUSES.PLANNED,
            'in-progress': status.status === STATUSES.IN_PROGRESS,
            live: status.status === STATUSES.LIVE,
            roadmap__dot: true,
          });
          return (
            <div className="roadmap__item">
              <div className="roadmap__status">
                <div className={dotClass} />
                {status.status}
              </div>
              <div>{status.count}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
