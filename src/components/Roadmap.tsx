import classNames from 'classnames'

//styles
import '../index.scss'

//types
interface Status {
    status: string;
    count: number;
}

export const Roadmap = () => {
    let statuses:Status[] = [
        {status: "Planned", count: 2},
        {status: "In-Progress", count: 2},
        {status: "Live", count: 2}
    ]

    return (
        <section className='roadmap'>
            <div className='roadmap__text'>
                <span>Roadmap</span>
                <span>View</span>
            </div>
            <div className='roadmap__list'>
                {statuses.map((status:Status) => {
                    const dotClass = classNames({
                        "planned": status.status === "Planned",
                        "in-progress": status.status === "In-Progress",
                        "live": status.status === "Live",
                        "roadmap__dot": true
                    })
                    return (
                    <div className='roadmap__item'>
                    <div className='roadmap__status'>
                        <div className={dotClass} /> 
                        {status.status}
                    </div>
                    <div>{status.count}</div>
                    </div>
                    )
                })}
            </div>

        </section>
    )
}