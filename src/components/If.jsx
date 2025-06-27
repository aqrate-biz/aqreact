export default function If({ children, condition, elseChildren }) {
  if (condition===false || condition===null || condition===undefined) {
    return children;
  } else {
    return elseChildren || null;
  }
}