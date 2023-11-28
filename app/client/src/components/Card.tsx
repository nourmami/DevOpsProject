function Card(props) {
  console.log(props)

  function facebook() {
    let u = props.image
    // t=document.title;
    let t = props.title + '\n' + props.description
    window.open(
      'http://www.facebook.com/sharer.php?u=' +
        encodeURIComponent(u) +
        '&t=' +
        encodeURIComponent(t),
      'sharer',
      'toolbar=0,status=0,width=626,height=436'
    )
    return false
  }
  function twitter() {
    let u = props.image
    // t=document.title;
    let t = props.title + '\n' + props.description
    window.open(
      'http://www.twitter.com/share?url=' +
        encodeURIComponent(u) +
        '&text=' +
        encodeURIComponent(t)
    )
    return false
  }

  return (
    <div className="backdrop lg:w-1/2 bg-black bg-opacity-10 rounded p-3 text-white shadow-lg md:w-5/6">
      <div className="w-full flex flex-row items-center justify-between">
        <h3 className="py-3 text-xl font-semibold text-shadow">
          {props.title}
        </h3>
        <span className="text-sm">
          <i className="fa fa-clock-o"></i>
          {props.date}
        </span>
      </div>
      <div>
        <img
          src={props.image}
          alt={props.title + '\n' + props.description}
          className="w-full h-auto"
        />
        <p className="py-3 px-3 tracking-wide text-base text-shadow">
          {props.description}
        </p>
        <div className="flex flex-row justify-between">
          <button
            onClick={() => facebook()}
            className="backdrop bg-white bg-opacity-0 px-3 py-1.5 rounded focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-40 hover:bg-opacity-10 text-lg"
          >
            <i className="fa fa-facebook-f"></i> Share to Facebook
          </button>
          <button
            onClick={() => twitter()}
            className="backdrop bg-white bg-opacity-0 px-3 py-1.5 rounded focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-40 hover:bg-opacity-10 text-lg"
          >
            <i className="fa fa-twitter"></i> Share to Twitter
          </button>
          <a
            href={props.image}
            target="_blank"
            className="backdrop cursor-pointer bg-white bg-opacity-0 px-3 py-1.5 rounded focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-40 hover:bg-opacity-10 text-lg"
            download={true}
          >
            <i className="fa fa-download"></i> Download
          </a>
          <button onClick={
            ()=>{
              window.prompt("Kindly specify your concern?","")
              setTimeout(function() {
                alert("We got your concern, we will see what to do about it... Thanks.")
              }, 1000)
          }} className="backdrop bg-white bg-opacity-0 px-3 py-1.5 rounded focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-40 hover:bg-opacity-10 text-lg">
            <i className="fa fa-shield"></i> Report
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card
