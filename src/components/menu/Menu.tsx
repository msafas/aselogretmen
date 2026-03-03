import { useMenu } from './data';
import { Link, useLocation } from 'react-router-dom';

const Menu = () => {

  const location = useLocation();
  const menu = useMenu();

  return (
    <div className="flex flex-col gap-2.5">
      {menu.map((category, index) => (
        <div key={index} className="flex flex-col gap-1.5">
          <div className="text-sm xl:text-base 2xl:text-lg font-semibold text-base-content/70 dark:text-base-content/50">
            {category.catalog.toUpperCase()}
          </div>
          {category.listItems.map((item, itemIndex) => (
            <Link
              key={itemIndex}
              to={item.url}
              className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm xl:text-base 2xl:text-lg transition-colors font-semibold
                ${
                  location.pathname === item.url
                    ? 'bg-[#0099ff] text-white'
                    : 'hover:bg-[#e0f7fa] hover:text-[#0099ff]'
                }`}
            >
              <item.icon className="w-5 h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7" />
              {item.label}
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Menu;