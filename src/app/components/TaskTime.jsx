

export default function TaskTime (props) {
    const { Time } = props
    
    console.log(Time)
    return (
        <div className="w-32">
            {Time || "Loading..."}
        </div>
    )

}