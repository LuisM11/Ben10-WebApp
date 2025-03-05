import AlienItem from "./AlienItem";

function Alien({ aliens }) {
  return (
    <div className="lg:grid-cols-4 grid w-full grid-cols-1 gap-6 px-4 sm:grid-cols-2 md:grid-cols-3"
         style={{backgroundImage: "url('/peakpx.jpg')"}}>
      {aliens.map((alien) => (
        <AlienItem key={alien.id} alien={alien} />
      ))}
    </div>
  );
}

export default Alien;
