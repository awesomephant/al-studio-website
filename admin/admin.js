import CMS from 'netlify-cms-app';
import { Widget as ReorderWidget } from '@ncwidgets/reorder'

CMS.registerWidget(ReorderWidget)
CMS.init();
CMS.registerEditorComponent({
  id: "gallery",
  label: "Gallery",
  fields: [
    {
      name: "images",
      label: "Images",
      label_singular: "Image",
      widget: "list",
      fields: [
        {
          label: "Image",
          name: "image",
          widget: "image",
          media_library: {
            config: {
              max_file_size: 6000000,
            },
          },
        },
        {
          label: "Image Caption",
          name: "caption",
          widget: "string",
          required: false
        },
        {
          label: "Alt text",
          name: "alt",
          widget: "string",
        },
      ],
    },
  ],

  // Pattern to identify a block as being an instance of this component
  pattern: /\{% gallery '([\S ]+)' %}/,
  // Function to extract data elements from the regexp match
  fromBlock: function (match) {
    let m = JSON.parse(match[1]);
    m.forEach(image => {
      if (image.caption){
        image.caption = image.caption.replace(/(&#x2019;)(?![\S\s]+image)/g, "'")
      }
      if (image.alt){
        image.alt = image.alt.replace(/(&#x2019;)(?![\S\s]+image)/g, "'")
      }
    })
    return {
      images: m,
    };
  },
  // Function to create a text block from an instance of this component
  toBlock: function (obj) {
    let data;
    if (obj.images) {
      data = obj.images;
    } else {
      data = [];
    }
    // We only have to worry about single quotes, double quotes are already escaped.
    let json = JSON.stringify(data).replace(/(')(?![\S\s]+image)/g, "&#x2019;")
    return `\{% gallery '${json}' %}`;
  },
  toPreview: function (obj) {
    return "";
  },
});
