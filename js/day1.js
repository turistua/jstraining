/**
 * Created with JetBrains PhpStorm.
 * User: iburyak
 * Date: 2/13/15
 * Time: 8:36 PM
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function() {
    var People = function(containerId) {
        this.containerId = containerId;
        this.rows = [];
        this.addRow = function (row) {
            this.rows.push(row);
            this.renderTable();
        };

        this.removeRow = function (id) {
            this.rows.splice(id, 1);
            this.renderTable();
        };

        this.fetchRow = function(id) {
            return this.rows[id];
        };

        this.editRow = function (id, row) {
            this.rows[id] = row;
            this.renderTable();
        };

        this.renderTable = function() {
            var tbody = $("#" + this.containerId).find("tbody");
            var tfoot = $("#" + this.containerId).find("tfoot");
            tbody.empty();
            var rowsLen = this.rows.length;
            for (var i = 0; i < rowsLen; i++) {
                tbody.append(this.renderRow(i, this.rows[i].fname, this.rows[i].lname, this.rows[i].age));
            }
            //tfoot.find('tr td:first-child').html(this.nextId());
        };

        this.renderRow = function (rowId, fname, lname, age) {
            return "<tr><td>" + (rowId+1) + "</td><td>" + fname + "</td><td>" + lname + "</td><td>" + age + "</td>" +
                "<td><a class='editButton' data-entity='" + rowId + "' href='#'>edit</a></td>" +
                "<td><a class='removeButton' data-entity='" + rowId + "' href='#'>remove</a></td>" +
            "<td>&nbsp;</td></tr>"
        };

        this.nextId = function() {
           return this.rows.length + 1;
        }
    };

    var peopleTable = new People("peopletable");
    var ageEl = $("#age");
    var fnameEl = $("#firstName");
    var lnameEl = $("#lastName");
    var submitEl = $("#submitButton");

    submitEl.click(function(){
        var id = $(this).data('entity');
        var fname = fnameEl.val();
        var lname = lnameEl.val();
        var age = ageEl.val();

        if (fname != '' && lname != '' && age != '' && age > 0) {
            var rowObject = {
                "fname": fname,
                "lname": lname,
                "age": age
            };
            if (id !== '') {
                peopleTable.editRow(id, rowObject);
                $(this).data('entity', '');
            } else {
                peopleTable.addRow(rowObject);
            }
            ageEl.val('');
            fnameEl.val('');
            lnameEl.val('');
        } else {
            alert('Invalid data, please fill all fields. Age should be numeric and ')
        }
    });

    $(document).on('click', '.removeButton', function() {
        var id = $(this).data("entity");
        peopleTable.removeRow(id);
    });

    $(document).on('click', '.editButton', function() {
        var id = $(this).data("entity");
        var data = peopleTable.fetchRow(id);

        fnameEl.val(data.fname);
        lnameEl.val(data.lname);
        ageEl.val(data.age);

        submitEl.data('entity', id);
    });

});