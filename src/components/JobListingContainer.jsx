import { useState } from "react";
import data from "./data.json";
import "./JobListingContainer.css";
import JobListingCard from "./JobListingCard.jsx";

function JobListingContainer() {
  //state object listing the filter items
  const [filterItems, setFilterItems] = useState({
    role: "",
    level: "",
    languages: [],
    tools: [],
  });

  //function to get the filtered item from the job listing card component and set in the state
  function getFilterInfo(type, value) {
    if (type === "languages" || type === "tools") {
      //checking if value already exists in the array
      if (filterItems[type].indexOf(value) === -1) {
        setFilterItems({
          ...filterItems,
          [type]: [...filterItems[type], value],
        });
      } else return;
    } else {
      setFilterItems({ ...filterItems, [type]: value });
    }
  }

  //function to handle the individual delete button for the filtered items
  function deleteFilter(event) {
    let id = event.target.id;
    let classNa = event.target.className;

    if (id === "role" || id === "level") {
      setFilterItems({ ...filterItems, [id]: "" });
    } else {
      let filteredArray = filterItems[classNa].filter((ele) => ele !== id);

      setFilterItems({
        ...filterItems,
        [classNa]: [...filteredArray],
      });
    }
  }

  //function to clear the filters
  function clearFilters() {
    setFilterItems({
      role: "",
      level: "",
      languages: [],
      tools: [],
    });
  }

  //variable to check if there is any items filtered
  let isfilterItems =
    filterItems.role ||
    filterItems.level ||
    filterItems.languages.length > 0 ||
    filterItems.tools.length > 0;

  //using filter method on the json data to filter the items based on the selected
  let filteredList = isfilterItems
    ? data.filter((ele) => {
        //boolean variable to store the ovrall boolean values
        let bool = [];
        //checked on the landuages
        if (filterItems.languages.length > 0) {
          for (let i of filterItems.languages) {
            if (ele.languages.indexOf(i) === -1) return false;
          }
          bool.push(true);
        }

        //checked on the tools
        if (filterItems.tools.length > 0) {
          for (let i of filterItems.tools) {
            if (ele.tools.indexOf(i) === -1) return false;
          }
          bool.push(true);
        }

        if (filterItems.role && filterItems.level) {
          bool.push(
            ele.role === filterItems.role && ele.level === filterItems.level
          );
        } else if (filterItems.role) {
          bool.push(ele.role === filterItems.role);
        } else if (filterItems.level) {
          bool.push(ele.level === filterItems.level);
        }

        return bool.indexOf(false) === -1;
      })
    : data;

  let filterBarClasses = isfilterItems ? "filter-bar" : "filter-bar invisible";

  return (
    <section>
      <article className={filterBarClasses}>
        <div>
          {filterItems.role && (
            <div>
              <div className="filter">{filterItems.role}</div>
              <button id="role" onClick={deleteFilter}>
                X
              </button>
            </div>
          )}
          {filterItems.level && (
            <div>
              <div className="filter">{filterItems.level}</div>
              <button id="level" onClick={deleteFilter}>
                X
              </button>
            </div>
          )}
          {filterItems.languages.length > 0 &&
            filterItems.languages.map((ele, ind) => (
              <div key={ind}>
                <div className="filter">{ele}</div>
                <button id={ele} className="languages" onClick={deleteFilter}>
                  X
                </button>
              </div>
            ))}
          {filterItems.tools.length > 0 &&
            filterItems.tools.map((ele, ind) => (
              <div key={ind}>
                <div className="filter">{ele}</div>
                <button id={ele} className="tools" onClick={deleteFilter}>
                  X
                </button>
              </div>
            ))}
        </div>
        <a className="clear" onClick={clearFilters}>
          Clear
        </a>
      </article>
      {filteredList.map((ele) => {
        return (
          <JobListingCard
            key={ele.id}
            obj={ele}
            getFilterInfo={getFilterInfo}
          />
        );
      })}
    </section>
  );
}

export default JobListingContainer;
