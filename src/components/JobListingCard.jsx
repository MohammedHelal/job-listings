import PropTypes from "prop-types";
import "./JobListingCard.css";

function JobListingCard({ obj, getFilterInfo }) {
  let articleClass = obj.featured ? "card border-left" : "card";
  return (
    <article className={articleClass}>
      <img className="logo" src={obj.logo} alt="Company Logo" />
      <div>
        <div className="company-name">
          <h4>{obj.company}</h4>
          {obj.new && <p className="new">NEW!</p>}
          {obj.featured && <p className="featured">FEATURED</p>}
        </div>
        <div className="company-job-info">
          <h3 className="job-title">{obj.position}</h3>
        </div>
        <div className="company-msc">
          <p className="msc-info">{obj.postedAt}</p>
          <div></div>
          <p className="msc-info">{obj.contract}</p>
          <div></div>
          <p className="msc-info">{obj.location}</p>
        </div>
      </div>
      <div className="filters">
        <p
          className="info-list"
          onClick={() => getFilterInfo("role", obj.role)}
        >
          {obj.role}
        </p>
        <p
          className="info-list"
          onClick={() => getFilterInfo("level", obj.level)}
        >
          {obj.level}
        </p>
        {obj.languages.map((ele, ind) => (
          <p
            key={ind}
            className="info-list"
            onClick={() => getFilterInfo("languages", ele)}
          >
            {ele}
          </p>
        ))}
        {obj.tools.map((ele, ind) => (
          <p
            key={ind}
            className="info-list"
            onClick={() => getFilterInfo("tools", ele)}
          >
            {ele}
          </p>
        ))}
      </div>
    </article>
  );
}

JobListingCard.propTypes = {
  obj: PropTypes.object,
  getFilterInfo: PropTypes.func,
};

export default JobListingCard;
