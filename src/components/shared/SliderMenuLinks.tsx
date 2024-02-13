
type Props = {
  imageUrl: string;
  title: string;
  description: string;
  color: string;
}

const SliderMenuLinks = (linkInfo: Props) => {
  return (
    <div className="border text-white h-[100px]">
      <h1>{linkInfo.title}</h1>
      <h2>{linkInfo.description}</h2>
    </div>
  )
}

export default SliderMenuLinks