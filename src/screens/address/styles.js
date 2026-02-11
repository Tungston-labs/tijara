import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
  },

  listContainer: {
    padding: 16,
  },

  addressCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    marginTop:20,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },

  headerContainer: {
    backgroundColor: "#B3DB48",
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },

backButton: {
  marginRight: 10,
},

headerText: {
  fontSize: 18,
  fontWeight: "700",
  color: "#000",
},

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  label: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
  },

  defaultBadge: {
    backgroundColor: "#7CB518",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },

  defaultText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
  },

  name: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 2,
  },

  phone: {
    fontSize: 13,
    color: "#555",
    marginBottom: 8,
  },

  addressText: {
    fontSize: 13,
    color: "#444",
    lineHeight: 18,
  },

  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },

  editText: {
    color: "#7CB518",
    fontWeight: "600",
  },

  deleteText: {
    color: "red",
    fontWeight: "600",
  },

  addButtonContainer: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#7CB518",
    width: 55,
    height: 55,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },

  addButtonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default styles;
