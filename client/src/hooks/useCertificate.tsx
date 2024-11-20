import { BirthCertificateSection } from "@/types/Components";
import {
  Amendment,
  convertBirthCertificateToState,
  RegistryOffice,
} from "@/utils/translation";
import { useCallback, useReducer } from "react";

export type BirthCertificatePages = [BirthCertificateSection[], Amendment[]];

type State = {
  pageHeader: RegistryOffice;
  pages: BirthCertificatePages;
  currentPage: number;
  modified: boolean;
};

export type ActionType =
  | {
      type: "CHANGE_PAGE";
      payload: number;
    }
  | {
      type: "UPDATE_FIELD";
      payload: {
        sectionIdx: number;
        fieldIdx: number;
        newValue: string;
      };
    }
  | {
      type: "UPDATE_ANNOTATION";
      payload: {
        annotationIdx: number;
        newValue: string;
      };
    };

function reducer(state: State, action: ActionType): State {
  switch (action.type) {
    case "CHANGE_PAGE":
      return { ...state, currentPage: action.payload };
    case "UPDATE_FIELD": {
      const newPages = [...state.pages];
      const { sectionIdx, fieldIdx, newValue } = action.payload;
      (
        newPages[state.currentPage - 1][sectionIdx] as BirthCertificateSection
      ).fields[fieldIdx].value = newValue;
      return {
        ...state,
        pages: [...(newPages as BirthCertificatePages)],
        modified: true,
      };
    }
    case "UPDATE_ANNOTATION": {
      const newPages = [...state.pages];
      return {
        ...state,
        pages: [...(newPages as BirthCertificatePages)],
        modified: true,
      };
    }
    default:
      return state;
  }
}

export function useCertificate(
  translation: ReturnType<typeof convertBirthCertificateToState>
) {
  const initialState = {
    pageHeader: translation.pageHeader,
    pages: translation.pages,
    currentPage: 1,
    modified: false,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateField = useCallback(
    (sectionIdx: number, fieldIdx: number, newValue: string) => {
      dispatch({
        type: "UPDATE_FIELD",
        payload: { sectionIdx, fieldIdx, newValue },
      });
    },
    []
  );

  const updateAnnotation = useCallback(
    (annotationIdx: number, newValue: string) => {
      dispatch({
        type: "UPDATE_ANNOTATION",
        payload: { annotationIdx, newValue },
      });
    },
    []
  );

  const handleNewPage = useCallback(
    (newPage: number) => dispatch({ type: "CHANGE_PAGE", payload: newPage }),
    []
  );

  return { state, updateField, updateAnnotation, handleNewPage };
}
