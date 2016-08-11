<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
<script>

    function InjectContentTypePicker() {
        var listId = _spPageContextInfo.pageListId;
        var siteUrl = _spPageContextInfo.webAbsoluteUrl;
        var apiUrl = String.format("{0}/_api/web/lists/GetById('{1}')/contenttypes", siteUrl, listId);

        jQuery.ajax({
            type: "GET",
            url: apiUrl,
            contentType: "application/json;odata=verbose",
            dataType: "json",
            cache: false,
            success: function (data, textStatus, jqXHR) {
                RenderDropdown(data.value);
            },
            error: function (data, textStatus, errorThrown) {
                console.log(textStatus);
            }
        });
    }

    function RenderDropdown(contentTypes) {
        var currUrl = window.location.href;
        var html = "<tr><td class='ms-formlabel'><h3 class='ms-standardheader'>Content Type</h3></td><td class='ms-formbody'><select id='content-type-picker' onchange='window.location = this.options[this.selectedIndex].value'>";
        var newUrl;
        jQuery.each(contentTypes, function (i, type) {
            if (currUrl.indexOf("ContentTypeId") == -1) {
                newUrl = String.format("{0}&ContentTypeId={1}", currUrl, type.Id.StringValue);
            } else {
                newUrl = currUrl.replace(/(ContentTypeId=)[^\&]+/, "$1" + type.Id.StringValue);
            }
            html += String.format("<option value='{0}' data-ctype='{1}'>{1}</option>", newUrl, type.Id.StringValue, type.Name);
        });
        html += "</td></tr></select>";

        jQuery(".ms-formtable").prepend(html);

        jQuery("#content-type-picker option").each(function () {
            if (currUrl.indexOf(jQuery(this).attr("data-ctype")) != -1) {
                jQuery(this).attr("selected", "selected");
            }
        });
    }

	_spBodyOnLoadFunctionNames.push("InjectContentTypePicker");
</script>