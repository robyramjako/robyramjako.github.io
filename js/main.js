const navToggle = document.getElementById("navToggle")
const siteNav = document.getElementById("siteNav")

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const open = document.body.classList.toggle("nav-open")
    navToggle.setAttribute("aria-expanded", String(open))
  })

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      document.body.classList.remove("nav-open")
      navToggle.setAttribute("aria-expanded", "false")
    })
  })
}

const themeToggle = document.getElementById("themeToggle")
const themeMeta = document.querySelector('meta[name="theme-color"]')

const applyThemeColor = () => {
  if (themeMeta) {
    themeMeta.content = document.documentElement.dataset.theme === "dark" ? "#101010" : "#FAFAF7"
  }
}

applyThemeColor()

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark"
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem("theme", next)
    } catch (error) {}
    applyThemeColor()
  })
}

const filterButtons = document.querySelectorAll(".filter-btn")
const projectCards = document.querySelectorAll(".project-card[data-tags]")

if (filterButtons.length > 0 && projectCards.length > 0) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      button.classList.add("active")
      const filter = button.dataset.filter
      projectCards.forEach((card) => {
        const tags = card.dataset.tags.split(" ")
        const show = filter === "all" || tags.includes(filter)
        card.classList.toggle("hidden", !show)
        if (show) {
          card.classList.remove("filter-in")
          void card.offsetWidth
          card.classList.add("filter-in")
        }
      })
    })
  })
}

const revealEls = document.querySelectorAll(".reveal")

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
          obs.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  )
  revealEls.forEach((el) => observer.observe(el))
} else {
  revealEls.forEach((el) => el.classList.add("visible"))
}

const yearEl = document.getElementById("year")
if (yearEl) {
  yearEl.textContent = new Date().getFullYear()
}
