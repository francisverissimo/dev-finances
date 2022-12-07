import Lottie from "lottie-react";
import animationData from "./budgeting.json";

export function Budgeting() {
  return <Lottie animationData={animationData} className="max-w-sm mx-auto" />;
}
