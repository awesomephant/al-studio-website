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
    const re = /(&#x2019;)/g;
    let gallery = JSON.parse(match[1]);
    return {
      images: gallery,
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
    // Sanitise JSON so it doesn't choke teh Eleventy Shortcode
    data.forEach(d => {
      // We only have to worry about single quotes, double quotes are already escaped.
      if (d.caption) {
        d.caption = d.caption.replace(/(')/g, "’")
      }
      if (d.alt) {
        d.alt = d.alt.replace(/(')/g, "’")
      }
    })
    let json = JSON.stringify(data)
    return `\{% gallery '${json}' %}`;
  },
  toPreview: function (obj) {
    return "";
  },
});
