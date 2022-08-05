export default function scroll(id, block) {
  document.getElementById(id).scrollIntoView({
    behavior: "smooth",
    block: block ? block : "nearest",
  });
}
