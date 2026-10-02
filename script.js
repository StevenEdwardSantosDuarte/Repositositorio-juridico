(() => {
  const progress = document.getElementById("progress");
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (max > 0 ? window.scrollY / max * 100 : 0) + "%";
  };
  window.addEventListener("scroll", updateProgress, {passive:true});
  updateProgress();

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:.12});
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  const sections = [...document.querySelectorAll("main section[id]")];
  const links = [...document.querySelectorAll(".nav a")];
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(link => link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id));
    });
  }, {rootMargin:"-35% 0px -55% 0px"});
  sections.forEach(section => sectionObserver.observe(section));

  if (window.matchMedia("(pointer:fine)").matches) {
    document.querySelectorAll(".magnetic").forEach(button => {
      button.addEventListener("pointermove", e => {
        const r = button.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * .12;
        const y = (e.clientY - r.top - r.height / 2) * .12;
        button.style.transform = "translate(" + x + "px," + y + "px)";
      });
      button.addEventListener("pointerleave", () => button.style.transform = "");
    });
    document.querySelectorAll(".tilt").forEach(card => {
      card.addEventListener("pointermove", e => {
        const r=card.getBoundingClientRect();
        const rx=((e.clientY-r.top)/r.height-.5)*-5;
        const ry=((e.clientX-r.left)/r.width-.5)*5;
        card.style.transform="perspective(700px) rotateX("+rx+"deg) rotateY("+ry+"deg) translateY(-3px)";
      });
      card.addEventListener("pointerleave", () => card.style.transform="");
    });
  }

  if (window.QRCode) {
    new QRCode(document.getElementById("qrcode"), {
      text: window.location.href, width:156, height:156,
      colorDark:"#111111", colorLight:"#ffffff",
      correctLevel:QRCode.CorrectLevel.H
    });
  }
})();