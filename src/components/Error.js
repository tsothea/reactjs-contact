import '../App.css';

export default function Error(props) {
    return (
        <div className="error" id="errors_id">{props.message}</div>
    );
}