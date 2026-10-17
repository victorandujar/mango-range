"use client";

import { RANGE_THUMBS, THUMBS } from "./constants";
import { EditableRangeLabel } from "./components/EditableRangeLabel";
import { RangeLabel } from "./components/RangeLabel";
import { RangeThumb } from "./components/RangeThumb";
import { RangeTrack } from "./components/RangeTrack";
import { useRange } from "./hooks/useRange";
import type { RangeProps, Thumb } from "./types";
import { createValueFormatter } from "./utils/format";
import { getRangeModel } from "./utils/rangeModel";
import { getThumbView } from "./utils/thumbView";

export const Range = (props: RangeProps) => {
  const model = getRangeModel(props);
  const formatValue = createValueFormatter(props.format);
  const { trackRef, selection, percents, draggingThumb, topThumb, setThumbValue, getThumbProps } =
    useRange({ bounds: model.bounds, step: model.step });

  const getView = (thumb: Thumb) => getThumbView(thumb, selection, model, formatValue);

  const renderLabel = (thumb: Thumb) => {
    const { value, text, limits } = getView(thumb);

    return model.isEditable ? (
      <EditableRangeLabel
        thumb={thumb}
        value={value}
        text={text}
        limits={limits}
        step={model.step}
        onCommit={(newValue) => setThumbValue(thumb, newValue)}
      />
    ) : (
      <RangeLabel thumb={thumb} text={text} />
    );
  };

  return (
    <div className="flex w-full items-center gap-4 py-4 select-none">
      {renderLabel(THUMBS.min)}
      <RangeTrack trackRef={trackRef} percents={percents}>
        {RANGE_THUMBS.map((thumb) => {
          const { value, text, limits } = getView(thumb);

          return (
            <RangeThumb
              key={thumb}
              thumb={thumb}
              percent={percents[thumb]}
              value={value}
              valueText={text}
              limits={limits}
              isOnTop={topThumb === thumb}
              isDragging={draggingThumb === thumb}
              {...getThumbProps(thumb)}
            />
          );
        })}
      </RangeTrack>
      {renderLabel(THUMBS.max)}
    </div>
  );
};
