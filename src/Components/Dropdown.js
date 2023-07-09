function DropdownMenu() {
//   const [activeMenu, setActiveMenu] = useState("main");
//   const [menuHeight, setMenuHeight] = useState(null);
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
//   }, []);

//   function calcHeight(el) {
//     const height = el.offsetHeight;
//     setMenuHeight(height);
//   }

//   function DropdownItem(props) {
//     return (
//       <a
//         href="#"
//         className="menu-item"
//         onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
//       >
//         <span className="icon-button">{props.leftIcon}</span>
//         {props.children}
//         <span className="icon-right">{props.rightIcon}</span>
//       </a>
//     );
//   }
//   DropdownItem
// }
}
export default DropdownMenu;
