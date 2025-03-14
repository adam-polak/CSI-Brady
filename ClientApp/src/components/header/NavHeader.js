import { useNavigate, useParams } from 'react-router-dom';

export default function NavHeader() {
    const { imageId } = useParams();
    const nav = useNavigate();

    const pageName = window.location.pathname.split('/')[1];

    const routes = [
        ['Home'],
        ['Facility', 'Leaderboard'],
        ['Area', imageId && parseInt(imageId) === -1 ? 'Submission': 'Images'],
        ['Camera'],
        ['Submission']
    ];

    const curPath = [];
    let curIndex = -1;
    let nestedIndex = 0;
    for(let i = 0; i < routes.length; i++) {
        for(let j = 0; j < routes[i].length; j++) {
            if(pageName.toLowerCase() === routes[i][j].toLowerCase()) {
                curIndex = i;
                nestedIndex = j;
                break;
            } else if(j === routes[i].length - 1) {
                curPath.push(routes[i][0]);
            }
        }

        if(curIndex !== -1) {
            for(let x = 0; x < nestedIndex + 1; x++) {
                curPath.push(routes[curIndex][x]);
            }

            break;
        }
    }

    const filteredRoutes = curPath.filter((_, i) => {
        return i <= curIndex + nestedIndex;
    });

    return (
        <div className="grey-dashboard pt-4 d-flex justify-content-center">
            <div className='d-flex gap-1' style={{overflowY: "scroll", width: "95%"}}>
                {filteredRoutes.map((value, i) => {
                    if(i !== curIndex + nestedIndex) {
                        return (
                            <div key={`route-${i}`} className="fs-4 d-flex align-content-center">
                                <button style={{color: "rgb(0, 0, 238)"}} onClick={() => nav(i - (curIndex + nestedIndex))} className="btn fs-4 text-decoration-underline">{value}</button>
                                <div className="pt-2">/</div>
                            </div>
                        );
                    } else {
                        return (
                            <div className="fs-4 pt-2 d-flex">
                                <div style={{width: ".3em"}} />
                                <div>{value}</div>
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    );
}