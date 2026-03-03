import {

  HiOutlineUser,

  HiOutlineClipboardDocumentList,

} from 'react-icons/hi2';
import { useAuth } from '../../api/AuthContext';

const getMenuItems = (user_type: number) => {
  return [
  {
    catalog: 'Randevu',
    listItems: [
      { isLink: true, url: '/dashboard/reservation', icon: HiOutlineUser, label: 'Randevu Al' ,accountTypes: [1, 2] }, // Tüm kullanıcılar için randevu al
      // Sadece admin için admin randevu yönetimi menüsü
     
    ],
  },
 
  {
    catalog: 'admin',
    listItems: [
  
            {
              isLink: true,
              url: '/dashboard/admin-appointments',
              icon: HiOutlineClipboardDocumentList,
              label: 'Randevu Yönetimi',
              accountTypes: [ 2]
            },
     
    ],
  },
 
 
].map((category) => {
  return {
    ...category,
    listItems: category.listItems.filter((item) => {
      // If no accountTypes specified, item is available to all
      if (!item.accountTypes) return true;
      // Check if user's account type is in the allowed account types
      return item.accountTypes.includes(user_type);
    }),
  };
}).filter((category) => category.listItems.length > 0); // Remove empty categories
};


export const useMenu = () => {
  const { user } = useAuth();
  const accountType = user?.user_type || 1;
  console.log('useMenu user:', user);
  console.log('Current Account Type:', accountType);
  return getMenuItems(accountType);
};
