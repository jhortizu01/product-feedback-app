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
        <h1>Roadmap</h1>
        <button>View</button>
      </div>
      <div className="roadmap__list">
        {statuses.map((status: Status, idx: number) => {
          const dotClass = classNames({
            planned: status.status === STATUSES.PLANNED,
            'in-progress': status.status === STATUSES.IN_PROGRESS,
            live: status.status === STATUSES.LIVE,
            roadmap__dot: true,
          });
          return (
            <div role="listitem" className="roadmap__item" key={idx}>
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
