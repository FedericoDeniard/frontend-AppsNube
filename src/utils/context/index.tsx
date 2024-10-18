import { useContext, createContext, useState, ReactNode } from "react";

type QueryType = {
  searchQuery: string;
  filterQuery: string;
};

type QueryContextProp = {
  query: QueryType;
  setQuery: React.Dispatch<React.SetStateAction<QueryType>>;
  handleSearch: (searchQuery: string) => Promise<void>;
  handleSearchFilters: (filterQuery: string) => Promise<void>;
  combinedQuery: string;
};

const defaultValue: QueryContextProp = {
  query: { searchQuery: "", filterQuery: "" },
  setQuery: () => {},
  handleSearch: async () => {},
  handleSearchFilters: async () => {},
  combinedQuery: "",
};

const QueryContext = createContext<QueryContextProp>(defaultValue);

export const useQueryContext = () => {
  const context = useContext(QueryContext);
  return context;
};

export const QueryProvider = ({ children }: { children: ReactNode }) => {
  const [query, setQuery] = useState<QueryType>({
    searchQuery: "",
    filterQuery: "",
  });

  const getCombinedQuery = (searchQuery: string, filterQuery: string) => {
    const queries: string[] = [];

    if (searchQuery) {
      queries.push(`name=${searchQuery}`);
    }

    if (filterQuery) {
      queries.push(filterQuery);
    }

    return queries.length ? `?${queries.join("&")}` : "";
  };

  const handleSearch = async (searchQuery: string) => {
    const finalQuery = {
      searchQuery,
      filterQuery: query.filterQuery,
    };

    setQuery(finalQuery);
  };

  const handleSearchFilters = async (filterQuery: string) => {
    const finalQuery = {
      searchQuery: query.searchQuery,
      filterQuery,
    };

    setQuery(finalQuery);
  };

  const combinedQuery = getCombinedQuery(query.searchQuery, query.filterQuery);

  return (
    <QueryContext.Provider
      value={{
        query,
        setQuery,
        handleSearch,
        handleSearchFilters,
        combinedQuery,
      }}
    >
      {children}
    </QueryContext.Provider>
  );
};
