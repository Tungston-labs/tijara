import React, { useState, useCallback } from "react";
import { ScrollView, RefreshControl } from "react-native";

const PullToRefreshWrapper = ({
  children,
  onReload,
  style,
  contentContainerStyle,
  showsVerticalScrollIndicator = false,
}) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    onReload && onReload();

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <ScrollView
      style={style}                                // 👈 ADDED
      contentContainerStyle={contentContainerStyle} // 👈 ADDED
      showsVerticalScrollIndicator={showsVerticalScrollIndicator} // 👈 ADDED
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {children}
    </ScrollView>
  );
};

export default PullToRefreshWrapper;
