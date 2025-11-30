import "./styles/normalize.scss";
import "./styles/main.scss";
import img1 from "./shared/assets/img/1.webp";
import img2 from "./shared/assets/img/2.webp";
import img3 from "./shared/assets/img/3.webp";
import img4 from "./shared/assets/img/4.webp";
import img5 from "./shared/assets/img/5.webp";
import img6 from "./shared/assets/img/6.webp";
import img7 from "./shared/assets/img/7.webp";
import img8 from "./shared/assets/img/8.webp";
import img9 from "./shared/assets/img/9.webp";

const coursesData = [
    {
        id: 1,
        title: "The Ultimate Google Ads Training Course",
        category: "Marketing",
        price: 100,
        author: "Jerome Bell",
        image: img1,
    },
    {
        id: 2,
        title: "Prduct Management Fundamentals",
        category: "Management",
        price: 480,
        author: "Marvin McKinney",
        image: img2,
    },
    {
        id: 3,
        title: "HR  Management and Analytics",
        category: "HR & Recruting",
        price: 200,
        author: "Leslie Alexander Li",
        image: img3,
    },
    {
        id: 4,
        title: "Brand Management & PR Communications",
        category: "Marketing",
        price: 530,
        author: "Kristin Watson",
        image: img4,
    },
    {
        id: 5,
        title: "Graphic Design Basic",
        category: "Design",
        price: 500,
        author: "Guy Hawkins",
        image: img5,
    },
    {
        id: 6,
        title: "Business Development Management",
        category: "Management",
        price: 400,
        author: "Dianne Russells",
        image: img6,
    },
    {
        id: 7,
        title: "Highload Software Architecture",
        category: "Development",
        price: 600,
        author: "Brooklyn Simmons",
        image: img7,
    },
    {
        id: 8,
        title: "Human Resources – Selection and Recruitment",
        category: "HR & Recruting",
        price: 150,
        author: "Kathryn Murphy",
        image: img8,
    },
    {
        id: 9,
        title: "User Experience. Human-centered Design",
        category: "Design",
        price: 240,
        author: "Cody Fisher",
        image: img9,
    },
    {
        id: 10,
        title: "User Experience. Human-centered Design",
        category: "Design",
        price: 240,
        author: "Cody Fisher",
        image: img9,
    },
];

const listEl = document.querySelector(".courses__list");
const searchEl = document.querySelector(".courses__input");
const loadMoreBtn = document.querySelector(".courses__more-btn");
const loadMoreBtnWrapper = document.querySelector(".courses__more");

let activeCategory = "all";
let searchValue = "";

let visibleCount = 9;
const STEP = 6;

function getFilteredCourses() {
    return coursesData.filter((course) => {
        const byCategory = activeCategory === "all" || course.category === activeCategory;
        const bySearch = course.title.toLowerCase().includes(searchValue.trim().toLowerCase());
        return byCategory && bySearch;
    });
}

function renderCourses() {
    listEl.innerHTML = "";

    const filtered = getFilteredCourses();
    if (filtered.length === 0) {
        listEl.style.display = "block";
        listEl.innerHTML = `
        <div class="courses__empty">Список пуст</div>
    `;
        loadMoreBtnWrapper.style.display = "none";
        return;
    }

    listEl.style.display = "grid";
    const sliced = filtered.slice(0, visibleCount);

    sliced.forEach((course) => {
        let categoryClass = "";
        switch (course.category) {
            case "Design":
                categoryClass = "courses__card-category_design";
                break;
            case "HR & Recruting":
                categoryClass = "courses__card-category_hr";
                break;
            case "Marketing":
                categoryClass = "courses__card-category_marketing";
                break;
            case "Management":
                categoryClass = "courses__card-category_management";
                break;
            case "Development":
                categoryClass = "courses__card-category_development";
                break;
            default:
                categoryClass = "courses__card-category_default";
        }

        const card = `
            <div class="courses__card">
                <img class="courses__card-img" src="${course.image}" alt="${course.title}">
                <div class="courses__card-info">
                    <div class="courses__card-category ${categoryClass}">${course.category}</div>
                    <h3 class="courses__card-title">${course.title}</h3>
                    <div class="courses__card-footer">
                        <span class="courses__card-price">$${course.price}</span>
                        <span class="courses__card-separator">|</span>
                        <span class="courses__card-author">by ${course.author}</span>
                    </div>
                </div>
            </div>
        `;
        listEl.insertAdjacentHTML("beforeend", card);
    });

    if (visibleCount >= filtered.length) {
        loadMoreBtnWrapper.style.display = "none";
    } else {
        loadMoreBtnWrapper.style.display = "flex";
    }
}

let searchTimeout;
searchEl.addEventListener("input", (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        searchValue = e.target.value;
        visibleCount = STEP;
        renderCourses();
    }, 300);
});

loadMoreBtn.addEventListener("click", () => {
    visibleCount += STEP;
    renderCourses();
});

function getCategoryCounts() {
    const counts = { all: coursesData.length };

    coursesData.forEach((course) => {
        counts[course.category] = (counts[course.category] || 0) + 1;
    });

    return counts;
}

function renderFilters() {
    const filtersEl = document.querySelector(".courses__filters");
    const counts = getCategoryCounts();

    const categories = ["all", ...new Set(coursesData.map((course) => course.category))];

    filtersEl.innerHTML = "";

    categories.forEach((category, index) => {
        const isActive = index === 0 ? "courses__filter_active" : "";
        const displayName = category === "all" ? "All" : category;
        const count = counts[category];

        const button = `
            <button class="courses__filter ${isActive}" data-category="${category}">
                ${displayName} <span class="courses__filter-count">${count}</span>
            </button>
        `;

        filtersEl.insertAdjacentHTML("beforeend", button);
    });

    attachFilterListeners();
}

function attachFilterListeners() {
    const filterButtons = document.querySelectorAll(".courses__filter");

    filterButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            filterButtons.forEach((b) => b.classList.remove("courses__filter_active"));
            btn.classList.add("courses__filter_active");

            activeCategory = btn.dataset.category;
            visibleCount = 9;
            renderCourses();
        });
    });
}

renderFilters();
renderCourses();
