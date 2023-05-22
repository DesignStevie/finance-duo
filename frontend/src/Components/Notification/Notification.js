import "./Notification.css";

export default function Notification(props) {
  return (
    <div className={"notification"}>
      <div className="notificationContent"><p>{props.message}</p></div>
      <div className="notificationActions">
        <svg
          onClick={props.closeNotification}
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.99998 8.0501L1.74998 13.3001C1.59998 13.4501 1.42498 13.5251 1.22498 13.5251C1.02498 13.5251 0.849975 13.4501 0.699975 13.3001C0.549975 13.1501 0.474976 12.9751 0.474976 12.7751C0.474976 12.5751 0.549975 12.4001 0.699975 12.2501L5.94998 7.0001L0.699975 1.7501C0.549975 1.6001 0.474976 1.4251 0.474976 1.2251C0.474976 1.0251 0.549975 0.850098 0.699975 0.700098C0.849975 0.550098 1.02498 0.475098 1.22498 0.475098C1.42498 0.475098 1.59998 0.550098 1.74998 0.700098L6.99998 5.9501L12.25 0.700098C12.4 0.550098 12.575 0.475098 12.775 0.475098C12.975 0.475098 13.15 0.550098 13.3 0.700098C13.45 0.850098 13.525 1.0251 13.525 1.2251C13.525 1.4251 13.45 1.6001 13.3 1.7501L8.04998 7.0001L13.3 12.2501C13.45 12.4001 13.525 12.5751 13.525 12.7751C13.525 12.9751 13.45 13.1501 13.3 13.3001C13.15 13.4501 12.975 13.5251 12.775 13.5251C12.575 13.5251 12.4 13.4501 12.25 13.3001L6.99998 8.0501Z"
            fill="#FFFFFF"
          />
        </svg>
      </div>
    </div>
  );
}