import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import Popup from "./Popup";
import { useAuth } from "@/providers/AuthProvider";
import { GetUserInformation } from "@/services/User";
import { RecommendCourse } from "@/Helpers/RecommendCourse";
import { SystemRecommedations } from "@/types/User";
import { onbordingType } from "@/types/Onbording";
import { CourseType } from "@/types/Courses";

interface PopupContextType {
  showPopup: (content: ReactNode) => void;
  closePopup: () => void;
}

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export const usePopup = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error("usePopup must be used within a PopupProvider");
  }
  return context;
};

export const PopupProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ReactNode>(null);
  const [Course, setCourse] = useState<CourseType>({} as CourseType);

  const { currentUser } = useAuth();

  useEffect(() => {
    const today = new Date();
    if (today.getDay() !== 3) return;

    GetUserInformation(currentUser.uid).then((response) => {
      if (!response.userPreferences) return;
      if (!response.SystemRecommedations) return;

      const SysRec: SystemRecommedations = response.SystemRecommedations;
      const UserPref: onbordingType = response.userPreferences;

      if (SysRec.refusedCounter === undefined) return;

      // if user never refused and has reached a milestone
      if (SysRec.refusedCounter === 0) {
        const hasNeededScore = Object.values(SysRec.Assets).some(
          (score) => score === 2
        );
        if (!hasNeededScore) return;
      }

      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const WasMoreThanOneWeek =
        new Date(SysRec.lastRefused || "") < oneWeekAgo;

      if(!WasMoreThanOneWeek) return  
        
      // else if refused is lower than 2 and he refused less than 1 week ago
      if (SysRec.refusedCounter <= 2 && WasMoreThanOneWeek) {
        const hasNeededScore = Object.values(SysRec.Assets).some(
          (score) => score === 30
        );
        if (!hasNeededScore) return;
      }
      
      if (SysRec.refusedCounter > 2 && WasMoreThanOneWeek) {
        const hasNeededScore = Object.values(SysRec.Assets).some(
          (score) => score === 80
        );
        if (!hasNeededScore) return;
      }

      RecommendCourse(UserPref, SysRec).then((res) => {
        setCourse(res as CourseType);
      });
      setIsOpen(true);
    });
  }, []);

  const showPopup = (popupContent: ReactNode) => {
    setContent(popupContent);
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
    setContent(null);
  };

  return (
    <PopupContext.Provider value={{ showPopup, closePopup }}>
      {children}
      <Popup
        id={currentUser.uid}
        Course={Course}
        isOpen={isOpen}
        onClose={closePopup}
      >
        {content}
      </Popup>
    </PopupContext.Provider>
  );
};
