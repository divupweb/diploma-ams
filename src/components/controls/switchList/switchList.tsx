import React, { useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Switch from "@mui/material/Switch";

import SwitchListItemsType from "../../../types/switchListsItemsType";
import { useDispatch } from "react-redux";
import { userCreateSliceActions } from "../../../store/userCreate/userCreateSlice";

import "./switchList.scss";
import useTranslate from "../../../hooks/useTranslate";
type PropsType = { switchListItems: SwitchListItemsType[] };

const SwitchList: React.FC<PropsType> = (props) => {
  const initialItems = props.switchListItems.map((item) => item.title);

  const [checked, setChecked] = React.useState([initialItems[0]]);

  const dispatch = useDispatch();

  const { t } = useTranslate();

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  useEffect(() => {
    dispatch(userCreateSliceActions.setServices(checked));
  }, [checked]);

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      subheader={<ListSubheader>{t("switch_list.title")}</ListSubheader>}
      className="switch-list"
    >
      {props.switchListItems.map((item, index) => {
        return (
          <ListItem
            key={item.title}
            className={
              "switch-list__item" +
              (index != 0
                ? " switch-list__item_disabled"
                : " switch-list__item_disabled")
            }
          >
            <ListItemIcon>
              <item.icon></item.icon>
            </ListItemIcon>
            <ListItemText
              id={`switch-list-label-${item.title}`}
              primary={`${item.title}`}
            />
            <Switch
              edge="end"
              onChange={handleToggle(`${item.title}`)}
              checked={checked.indexOf(`${item.title}`) !== -1}
              inputProps={{
                "aria-labelledby": `switch-list-label-${item.title}`,
              }}
            />
          </ListItem>
        );
      })}
    </List>
  );
};

export default SwitchList;
